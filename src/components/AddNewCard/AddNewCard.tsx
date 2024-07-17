import { Box, Typography, styled } from "@mui/material";
import StyledTextField from "../ui/StyledTextField/StyledTextField";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { StyledButton } from "../ui/StyledButton/StyledButton";
import InputMask from "react-input-mask";
import { TCardsItem } from "../../types/types";
import { useTranslation } from "react-i18next";

interface IProps {
  onSubmitForm: ({ number, owner, expiry }: TCardsItem) => void;
}

const StyledForm = styled('form')`
  max-width: 100%;
`

function AddNewCard({
  onSubmitForm,
}: IProps) {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardOwner, setCardOwner] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');

  const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(true);
  const [isCardOwnerValid, setIsCardOwnerValid] = useState<boolean>(true);
  const [isExpiryValid, setIsExpiryValid] = useState<boolean>(true);

  const isFormDisabled = useMemo(() => {
    return !isCardOwnerValid
      || !isExpiryValid
      || !isCardNumberValid
      || !cardNumber.length
      || !cardOwner.length
      || !expiry.length;
  }, [isCardOwnerValid, isExpiryValid, isCardNumberValid, cardNumber, cardOwner, expiry]);

  const handleChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    setIsCardNumberValid(!!e.target.value.match(/((\d{4}[\s-]?){3}\d{4})/));
  }
  
  const handleChangeCardOwner = (e: ChangeEvent<HTMLInputElement>) => {
    setCardOwner(e.target.value);
    setIsCardOwnerValid(!!e.target.value.match(/^[a-zA-Z\s-.',();]{3,}$/));
  }

  const handleChangeExpiry = (e: ChangeEvent<HTMLInputElement>) => {
    setExpiry(e.target.value);
    setIsExpiryValid(!!e.target.value.match(/^(?:0[1-9]|1[0-2])\/(\d{2})$/));
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormDisabled) {
      return;
    }
    onSubmitForm({ number: cardNumber, owner: cardOwner, expiry });
    setCardNumber('');
    setCardOwner('');
    setExpiry('');
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: '600',
          marginBottom: '16px',
          fontSize: { xs: '24px', sm: '32px' }
        }}
      >
        {t('add-card.title')}
      </Typography>

      <StyledForm
        data-test-id="add-card-form"
        onSubmit={handleSubmitForm}
      >
        <Box
          sx={{
            display: { xs: 'block', sm: 'flex' },
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <InputMask
            mask='9999 9999 9999 9999'
            value={cardNumber}
            onChange={handleChangeCardNumber}
          >
            <StyledTextField
              data-test-id="card-number-input"
              placeholder="1234 5678 9012 3456"
              error={!isCardNumberValid}
              helperText="Please, enter valid card number"
              dataTestId="card-number-input"
              sx={{
                height: 'auto',
                flex: '0 0 33%',
                display: { xs: 'block', sm: 'inline-flex' },
                '& .MuiInputBase-root': {
                  width: '100%',
                  '& input': { padding: { xs: '8px 7px', sm: '16px 14px' } },
                  fontSize: { xs: '12px', sm: '12px', md: '16px' },
                },
                '&:not(:last-child)': { marginBottom: { xs: '8px', sm: '0px' } },
              }}
            />
          </InputMask>

          <StyledTextField
            data-test-id="card-owner-input"
            value={cardOwner}
            placeholder="John Doe"
            sx={{
              height: 'auto',
              flex: '0 0 33%',
              display: { xs: 'block', sm: 'inline-flex' },
              '& .MuiInputBase-root': {
                  width: '100%',
                  '& input': { padding: { xs: '8px 7px', sm: '16px 14px' } },
                  fontSize: { xs: '12px', sm: '12px', md: '16px' },
                },
              '&:not(:last-child)': { marginBottom: { xs: '8px', sm: '0px' } }
            }}
            error={!isCardOwnerValid}
            helperText="Please, enter valid card owner name"
            dataTestId="card-owner-input"
            onChange={handleChangeCardOwner}
          />

          <InputMask
            mask='99/99'
            value={expiry}
            onChange={handleChangeExpiry}
          >
            <StyledTextField
              data-test-id="card-expiry-input"
              placeholder="MM/YY"
              dataTestId="card-expiry-input"
              helperText="Please, enter valid date"
              sx={{
                height: 'auto',
                flex: '0 0 33%',
                display: { xs: 'block', sm: 'inline-flex' },
                '& .MuiInputBase-root': {
                  width: '100%',
                  '& input': { padding: { xs: '8px 7px', sm: '16px 14px' } },
                  fontSize: { xs: '12px', sm: '12px', md: '16px' },
                },
                '&:not(:last-child)': { marginBottom: { xs: '8px', sm: '0px' } }
              }}
              error={!isExpiryValid}
            />
          </InputMask>
        </Box>

        <Box>
          <StyledButton
            variant="contained"
            disabled={isFormDisabled}
            type="submit"
            data-test-id="add-card-button"
            sx={{ padding: { xs: '2px 8px', sm: '4px 16px' }, fontSize: { xs: '10px', sm: '12px', md: '16px' } }}
          >
            {t('add-card.button')}
          </StyledButton>
        </Box>
      </StyledForm>
    </div>
  );
}

export default AddNewCard;
