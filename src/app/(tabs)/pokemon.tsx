import { isAxiosError } from "axios";
import { PokeAPI } from "pokeapi-types";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Keyboard } from "react-native";

import { usePokemonStore } from "@/_zustand";
import { Pokeapi } from "@/client";
import { ErrorCode } from "@/client/errors";
import { PokemonActionCard } from "@/components/app/Pokemon";
import {
  Box,
  Button,
  FontText,
  Header,
  Input,
  PokeballBgScreenContent
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { styled } from "@/theme";
import { showToast } from "@/utils";

const PokemonResultsList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false
})`` as new () => FlatList<PokeAPI.Pokemon>;

export default function PokemonScreen() {
  const currentPokemon = usePokemonStore.use.currentPokemon();
  const pokemonList = usePokemonStore.use.pokemonList() as PokeAPI.Pokemon[];

  const renderPokemon = useCallback(
    ({ item }: { item: PokeAPI.Pokemon }) => (
      <PokemonActionCard onPress={() => null} pokemon={item} />
    ),
    []
  );

  return (
    <Box flex={1} backgroundColor="background">
      <PokeballBgScreenContent>
        <PokemonResultsList
          bounces={false}
          ListHeaderComponent={FormHeader}
          data={
            pokemonList.length > 0
              ? pokemonList
              : currentPokemon
              ? [currentPokemon]
              : undefined
          }
          keyExtractor={item => `${item.name}-${item.id}`}
          ListEmptyComponent={<FontText>No Pokémon found</FontText>}
          renderItem={renderPokemon}
        />
      </PokeballBgScreenContent>
    </Box>
  );
}

const FormHeader = () => {
  const { t, language } = useTranslation();
  const setCurrentPokemon = usePokemonStore.use.setCurrentPokemon();
  const setPokemonList = usePokemonStore.use.setPokemonList();

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

  return (
    <>
      <Header>{t("base:pokemon")}</Header>
      <Controller
        key="pokemon"
        control={control}
        name="pokemon"
        render={({
          field: { ref, onChange, ...field },
          fieldState: { error }
        }) => (
          <Input
            ref={ref}
            lang={language}
            type="search"
            label={t("base:search")}
            placeholder={t("pokemon:searchPlaceholder")}
            onChangeText={onChange}
            {...field}
            error={error}
            marginBottom="lg"
            onFilterIconPress={() => {
              console.log("Filter pressed");
            }}
          />
        )}
      />
      <Button
        backgroundColor="primary2"
        marginBottom="lg"
        labelColor="white"
        loading={isSubmitting}
        onPress={handleSubmit(({ pokemon }) => {
          Keyboard.dismiss();
          return new Promise<void>(resolve => {
            Pokeapi.getPokemon({
              body: { pokemon },
              onSuccess: res => {
                if ("results" in res.data) {
                  const results = res.data.results as PokeAPI.Pokemon[];
                  setPokemonList(results);
                  setCurrentPokemon(results[0]);
                } else {
                  setCurrentPokemon(res.data);
                }
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
        })}
      >
        Get Pokémon
      </Button>
    </>
  );
};
