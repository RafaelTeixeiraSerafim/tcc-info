import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { translateStatus } from "../utils/helpers";
import { IOrder } from "../interfaces";

interface OrderStatusStepperProps {
  statusList: IOrder["status"][];
  onChange: (value: IOrder["status"]) => void;
  value: IOrder["status"];
}

export default function OrderStatusStepper({
  statusList,
  onChange,
  value,
}: OrderStatusStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = useMemo(
    () => [
      {
        label: statusList[0],
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
      },
      {
        label: statusList[1],
        description:
          "An ad group contains one or more ads which target a shared set of keywords.",
      },
      {
        label: statusList[2],
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
      },
    ],
    [statusList]
  );

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    onChange(steps[activeStep].label);
  }, [activeStep, steps, onChange]);

  useEffect(() => {
    let valueIdx;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].label === value) {
        valueIdx = i;
        break;
      }
    }
    if (valueIdx) setActiveStep(valueIdx);
  }, [value, steps]);

  return (
    <Box width={"100%"}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {
            completed: activeStep === steps.length - 1 || undefined,
          };
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  "& .MuiStepLabel-label": {
                    display: "flex",
                    gap: "0.25rem",
                  },
                }}
              >
                {translateStatus(step.label)}
                <Tooltip
                  title={
                    <>
                      <Typography fontSize={"0.75rem"}>
                        As dimensões da <b>caixa</b> em que o produto será
                        transportado
                      </Typography>
                      <br />
                      <Typography fontSize={"0.75rem"}>
                        Elas serão utilizadas para o cálculo do frete do produto
                      </Typography>
                    </>
                  }
                >
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{ alignContent: "end" }}
                  />
                </Tooltip>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep >= steps.length - 2 ? "Terminar" : "Próximo"}
        </Button>
      </Box>
    </Box>
  );
}
