import { isAxiosError } from "axios";
import {
  Check,
  MagnifyingGlass,
  SlidersHorizontal,
  X
} from "phosphor-react-native";
import { PokeAPI } from "pokeapi-types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Keyboard } from "react-native";

import { usePokemonStore } from "@/_zustand";
import { Pokeapi } from "@/client";
import { ErrorCode } from "@/client/errors";
import { PokemonActionCard } from "@/components/app/Pokemon";
import {
  AnimatedPressable,
  Box,
  Button,
  FontText,
  Graphic,
  Header,
  Input,
  PokeballBgScreenContent
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { styled } from "@/theme";
import { showToast } from "@/utils";

type SearchFormToggleButtonProps = {
  customSearch: boolean;
  setCustomSearch: Dispatch<SetStateAction<boolean>>;
};

type FilterToggleButtonProps = {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
};

const PokemonResultsList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false
})`` as new () => FlatList<PokeAPI.Pokemon>;

export default function PokemonScreen() {
  const { t } = useTranslation();
  const [customSearch, setCustomSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const currentPokemon = usePokemonStore.use.currentPokemon();
  const pokemonList = usePokemonStore.use.pokemonList() as PokeAPI.Pokemon[];
  const setPokemonList = usePokemonStore.use.setPokemonList();
  // const paginationData = usePokemonStore.use.paginationData();
  const setPaginationData = usePokemonStore.use.setPaginationData();

  const renderPokemon = useCallback(
    ({ item }: { item: PokeAPI.Pokemon }) => (
      <PokemonActionCard onPress={() => null} pokemon={item} />
    ),
    []
  );

  useEffect(() => {
    setPokemonList([]);
    Pokeapi.getPaginatedPokemonList({
      body: { limit: 10, offset: 0 },
      onSuccess: async res => {
        setPaginationData(res.data);
        let newPokemonList = [] as PokeAPI.Pokemon[];

        for (let result of res.data.results) {
          const splitUrl = result.url.split("/");
          const pokemonId = splitUrl[splitUrl.length - 2];
          await Pokeapi.getPokemon({
            body: { pokemon: pokemonId },
            onSuccess: res => {
              newPokemonList.push(res.data);
            }
          });
        }
        setPokemonList(newPokemonList);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <>
        <Box flexDirection="row">
          <Header>{t("base:pokemon")}</Header>
          <Box flexDirection="row" justifyContent="flex-end" flex={1}>
            <FilterToggleButton
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
            <SearchFormToggleButton
              customSearch={customSearch}
              setCustomSearch={setCustomSearch}
            />
          </Box>
        </Box>
        {customSearch && <PokemonSearchForm />}
      </>
    );
  }, [customSearch, openFilter, t]);

  const getDisplayablePokemon = useCallback(() => {
    if (customSearch) {
      return currentPokemon ? [currentPokemon] : undefined;
    }
    if (pokemonList.length > 0) {
      return pokemonList;
    }
    return undefined;
  }, [currentPokemon, customSearch, pokemonList]);

  return (
    <Box flex={1} backgroundColor="background">
      <PokeballBgScreenContent>
        <PokemonResultsList
          bounces={false}
          ListHeaderComponent={renderHeader}
          data={getDisplayablePokemon()}
          keyExtractor={item => `${item.name}-${item.id}`}
          ListEmptyComponent={<FontText>No Pokémon found</FontText>}
          renderItem={renderPokemon}
        />
      </PokeballBgScreenContent>
    </Box>
  );
}

const FilterToggleButton = ({ setOpenFilter }: FilterToggleButtonProps) => {
  const diameter = 40;
  return (
    <AnimatedPressable
      width={diameter}
      height={diameter}
      padding="sm"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary3"
      marginRight="md"
      borderRadius="full"
      marginBottom="lg"
      alignSelf="flex-end"
      onPress={() => {
        setOpenFilter(true);
      }}
    >
      <Graphic color="grey1" as={SlidersHorizontal} />
    </AnimatedPressable>
  );
};

const SearchFormToggleButton = ({
  customSearch,
  setCustomSearch
}: SearchFormToggleButtonProps) => {
  const diameter = 40;
  return (
    <AnimatedPressable
      width={diameter}
      height={diameter}
      padding="sm"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary3"
      borderRadius="full"
      marginBottom="lg"
      alignSelf="flex-end"
      onPress={() => {
        setCustomSearch(!customSearch);
      }}
    >
      {customSearch ? (
        <Graphic color="grey1" as={X} />
      ) : (
        <Graphic color="grey1" as={MagnifyingGlass} />
      )}
    </AnimatedPressable>
  );
};

const PokemonSearchForm = () => {
  const { t, language } = useTranslation();
  const setCurrentPokemon = usePokemonStore.use.setCurrentPokemon();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      pokemon: ""
    }
  });

  const onFormValid: Parameters<typeof handleSubmit>[0] = useCallback(
    ({ pokemon }) => {
      Keyboard.dismiss();
      return new Promise<void>(resolve => {
        Pokeapi.getPokemon({
          body: { pokemon },
          onSuccess: res => {
            setCurrentPokemon(res.data);
            resolve();
          },
          onFailure: error => {
            resolve();
            if (
              isAxiosError(error) &&
              error.code === ErrorCode.ERR_BAD_REQUEST
            ) {
              showToast({
                type: "error",
                text1: t("pokemon:notFound"),
                text2: t("pokemon:notFoundMsg")
              });
            }
          }
        });
      });
    },
    [setCurrentPokemon, t]
  );

  return (
    <Controller
      key="pokemon"
      control={control}
      name="pokemon"
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error }
      }) => (
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Box flex={1} justifyContent="center">
            <Input
              ref={ref}
              lang={language}
              type="search"
              rules={{ required: t("base:requiredField") }}
              label={t("base:search")}
              placeholder={t("pokemon:searchPlaceholder")}
              onChangeText={onChange}
              {...field}
              error={error}
              marginBottom="lg"
              showLeftIcon={false}
              showRightIcon={false}
            />
          </Box>
          <Box marginLeft="md">
            <Box width={40}>
              <Button
                backgroundColor="primary1"
                marginBottom="lg"
                labelColor="grey1"
                loading={isSubmitting}
                onPress={handleSubmit(onFormValid)}
              >
                <Graphic as={Check} color="grey1" />
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    />
  );
};
