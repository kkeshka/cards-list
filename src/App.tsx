import { useEffect } from 'react';
import { Box } from '@mui/material';
import AddNewCard from './components/AddNewCard/AddNewCard';
import CardsList from './components/CardsList/CardsList';
import { addCardToList, blockCard, setCardsList, setLanguage } from './store/appSlice';
import useAppSelector from './hooks/useSelector';
import useAppDispatch from './hooks/useDispatch';
import { TCardsItem } from './types/types';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    fetch('data/cards.json')
      .then(async (data) => {
        const json = await data.json();
        dispatch(setCardsList(json.cards));
      });
  }, [])

  const cards = useAppSelector((state) => state.app.cards);
  const language = useAppSelector((state) => state.app.language);

  const handleBlockCard = ({ id }: { id: number }) => {
    dispatch(blockCard({ id }));
  }

  const handleSubmitForm = ({ number, owner, expiry }: TCardsItem) => {
    dispatch(addCardToList({ number, owner, expiry }));
  }

  const handleChangeLanguage = (value: string) => {
    dispatch(setLanguage({ value }));
    i18n.changeLanguage(value.toLowerCase());
  }

  return (
    <Box
      sx={{ width: '100%' }}
    >
      <Box
        sx={{
          maxWidth: '1024px',
          padding: { xs: '4px', sm: '16px', md: '32px' },
          margin: '0 auto',
        }}
      >
        <Box
          sx={{ marginBottom: '32px' }}
        >
          <LanguageSwitch
            value={language}
            onChange={handleChangeLanguage}
          />
        </Box>

        <Box
          sx={{ marginBottom: '32px' }}
        >
          <CardsList
            cards={cards}
            onBlockCard={handleBlockCard}
          />
        </Box>

        <Box>
          <AddNewCard
            onSubmitForm={handleSubmitForm}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default App
