import {
  ArrowUUpLeft,
  ArrowUUpRight,
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
import { Dimensions, FlatList } from "react-native";

import { usePokemonStore } from "@/_zustand";
import { Pokeapi } from "@/client";
import { PokemonActionCard, PokemonSearchForm } from "@/components/app/Pokemon";
import {
  AnimatedPressable,
  Box,
  Graphic,
  Header,
  PokeballBgScreenContent,
  Spinner
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { Spacing, styled } from "@/theme";

type SearchFormToggleButtonProps = {
  customSearch: boolean;
  setCustomSearch: Dispatch<SetStateAction<boolean>>;
};

type FilterToggleButtonProps = {
  openFilter: boolean;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
};

type SearchParams = Parameters<
  typeof Pokeapi.getPaginatedPokemonList
>[0]["body"];

const PokemonResultsList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false
})`` as new () => FlatList<PokeAPI.Pokemon>;

export const SpinnerWrapper = styled.View`
  flex: 1;
  height: ${Dimensions.get("window").height / 2}px;
  justify-content: center;
  align-items: center;
`;

export default function PokemonScreen() {
  const { t } = useTranslation();
  const [customSearch, setCustomSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const currentPokemon = usePokemonStore.use.currentPokemon();
  const pokemonList = usePokemonStore.use.pokemonList() as PokeAPI.Pokemon[];
  const paginationData = usePokemonStore.use.paginationData();
  const setPokemonList = usePokemonStore.use.setPokemonList();
  const setPaginationData = usePokemonStore.use.setPaginationData();

  const loadPokemonList = useCallback(
    ({ limit, offset }: SearchParams) => {
      setPokemonList([]);
      Pokeapi.getPaginatedPokemonList({
        body: { limit, offset },
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
    },
    [setPaginationData, setPokemonList]
  );

  useEffect(() => {
    loadPokemonList({ limit: 10, offset: 0 });
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

  const renderPokemon = useCallback(
    ({ item }: { item: PokeAPI.Pokemon }) => (
      <PokemonActionCard onPress={() => null} pokemon={item} />
    ),
    []
  );

  return (
    <Box flex={1} backgroundColor="background">
      <PokeballBgScreenContent>
        {renderHeader()}
        <PokemonResultsList
          bounces={false}
          data={getDisplayablePokemon()}
          keyExtractor={item => `${item.name}-${item.id}`}
          {...(customSearch
            ? {}
            : {
                ListEmptyComponent: (
                  <SpinnerWrapper>
                    <Spinner size={60} />
                  </SpinnerWrapper>
                )
              })}
          ListFooterComponent={<Box marginVertical="xxl" />}
          renderItem={renderPokemon}
        />
      </PokeballBgScreenContent>
      {!customSearch && (
        <Box position="absolute" bottom={0} flex={1} paddingHorizontal="md">
          <Box style={{ width: "100%" }} flexDirection="row">
            {paginationData?.previous && (
              <PaginationButton
                loadPokemonList={loadPokemonList}
                action="previous"
              />
            )}
            {paginationData?.next && (
              <PaginationButton
                loadPokemonList={loadPokemonList}
                action="next"
                marginLeft="auto"
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

type PaginationButtonProps = {
  action: "next" | "previous";
  loadPokemonList: (params: SearchParams) => void;
  marginLeft?: Spacing;
};

const PaginationButton = ({
  action,
  loadPokemonList,
  marginLeft
}: PaginationButtonProps) => {
  const paginationData = usePokemonStore.use.paginationData();
  const diameter = 50;
  return (
    <AnimatedPressable
      width={diameter}
      height={diameter}
      padding="xs"
      justifyContent="center"
      alignItems="center"
      backgroundColor="grey9"
      borderRadius="full"
      marginBottom="lg"
      alignSelf="flex-end"
      {...(marginLeft ? { marginLeft } : {})}
      onPress={() => {
        if (paginationData?.[action]) {
          const params = new URL(paginationData[action]).searchParams;
          loadPokemonList({
            limit: Number(params.get("limit")),
            offset: Number(params.get("offset"))
          });
        }
      }}
    >
      <Graphic
        color="grey1"
        as={action === "next" ? ArrowUUpRight : ArrowUUpLeft}
      />
    </AnimatedPressable>
  );
};

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
