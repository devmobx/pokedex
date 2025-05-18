import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";

import { Pokeapi } from "@/client";
import { ErrorCode } from "@/client/errors";
import {
  BackgroundPokeball,
  Button,
  Header,
  Input,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n";
import { showToast } from "@/utils";
import { isAxiosError } from "axios";

export default function PokedexScreen() {
  const { t, language } = useTranslation();

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
      <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
        <Header>{t("base:pokedex")}</Header>
        <Controller
          key="pokemon"
          control={control}
          name="pokemon"
          rules={{ required: "This field is required" }}
          render={({
            field: { ref, onChange, ...field },
            fieldState: { error }
          }) => (
            <Input
              ref={ref}
              lang={language}
              type="text"
              label="Search for pokemon"
              onChangeText={onChange}
              {...field}
              error={error}
              keyboardType="default"
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
                onSuccess: () => {
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
                      text1: t("pokedex:notFound"),
                      text2: t("pokedex:notFoundMsg")
                    });
                  }
                }
              });
            });
          })}
        >
          Get Pokemon
        </Button>
      </Screen.Container>
      <BackgroundPokeball />
    </>
  );
}
