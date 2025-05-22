import { isAxiosError } from "axios";
import { Check } from "phosphor-react-native";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";

import { usePokemonStore } from "@/_zustand";
import { Pokeapi } from "@/client";
import { ErrorCode } from "@/client/errors";
import { Box, Button, Graphic, Input } from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";
import { showToast } from "@/utils";

export const PokemonSearchForm = () => {
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
