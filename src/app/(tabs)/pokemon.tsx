import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";

import { usePokemonStore } from "@/_zustand";
import { Pokeapi } from "@/client";
import { ErrorCode } from "@/client/errors";
import { PokemonCard } from "@/components/app/Pokemon";
import {
  Box,
  Button,
  Header,
  Input,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n";
import { showToast } from "@/utils";

export default function PokemonScreen() {
  const { t, language } = useTranslation();
  const setCurrentPokemon = usePokemonStore.use.setCurrentPokemon();
  const currentPokemon = usePokemonStore.use.currentPokemon();

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
    <Screen.Container edges={["bottom"]}>
      <PokeballBgScreenContent>
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
              onFilterIconPress={() => {
                console.log("Filter pressed");
              }}
            />
          )}
        />
        <Button
          backgroundColor="primary2"
          marginTop="xxl"
          labelColor="white"
          loading={isSubmitting}
          onPress={handleSubmit(({ pokemon }) => {
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
          })}
        >
          Get Pokemon
        </Button>
        <Box flex={1}>
          {currentPokemon && <PokemonCard pokemon={currentPokemon} />}
        </Box>
      </PokeballBgScreenContent>
    </Screen.Container>
  );
}
