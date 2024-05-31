// components/CenterInformation.js
import React from "react";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import TitleBox from "../../../../components/components/TitleBox";
import FormFields from "../../../../components/formField/FormFields";
import { centerInformation } from "./data";

const CenterInformation = ({ setFieldValue, handleChange }) => {
    return (
        <Stack spacing={6}>
            <TitleBox title=" Center Information" />
            <SimpleGrid columns={2} px={7} columnGap={4} rowGap={4}>
                <FormFields fields={centerInformation} setFieldValue={setFieldValue} handleChange={handleChange} />
            </SimpleGrid>
        </Stack>
    );
};

export default CenterInformation;
