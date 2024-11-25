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
        description: (
          <Typography fontSize={"0.75rem"}>
            O pedido foi recebido e está sendo processado. Isso inclui separar
            os produtos no estoque, embalar os itens e preparar a documentação
            necessária para envio (como notas fiscais ou etiquetas).
          </Typography>
        ),
      },
      {
        label: statusList[1],
        description: (
          <Typography fontSize={"0.75rem"}>
            O pedido já foi despachado e está em trânsito para o endereço do
            cliente. <br />
            <br />
            <strong>Quando mudar para este status:</strong> Assim que o pedido
            for entregue à transportadora ou estiver com o entregador
            responsável.
          </Typography>
        ),
      },
      {
        label: statusList[2],
        description: (
          <Typography fontSize={"0.75rem"}>
            O pedido foi entregue com sucesso ao cliente no endereço informado.
            <br />
            <br />
            <strong>Quando mudar para este status:</strong> Assim que houver a
            confirmação da entrega, seja pelo rastreamento do transportador ou
            por outro meio de verificação.
          </Typography>
        ),
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
                <Tooltip title={step.description}>
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
