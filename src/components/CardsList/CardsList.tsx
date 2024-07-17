import { Typography } from "@mui/material";
import { StyledButton } from "../ui/StyledButton/StyledButton";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { TCardsItem } from "../../types/types";
import { useTranslation } from "react-i18next";

interface IProps {
  cards: TCardsItem[];
  onBlockCard: ({ id }: { id: number }) => void;
}

function CardsList({
  cards,
  onBlockCard,
}: IProps) {
  const { t } = useTranslation();
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
        {t('cards.title')}
      </Typography>

      <Table data-test-id="card-list">
        <TableHead>
          <TableRow
            sx={{ backgroundColor: '#ccc' }}
          >
            <TableCell
              sx={{
                fontSize: { xs: '10px', sm: '12px', md: '16px' },
                padding: { xs: '4px', sm: '8px', md: '16px' },
                fontWeight: '600'
              }}
            >
              {t('cards.table.head.number')}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: '10px', sm: '12px', md: '16px' },
                padding: { xs: '4px', sm: '8px', md: '16px' },
                fontWeight: '600'
              }}
            >
              {t('cards.table.head.name')}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: '10px', sm: '12px', md: '16px' },
                padding: { xs: '4px', sm: '8px', md: '16px' },
                fontWeight: '600'
              }}
            >
              {t('cards.table.head.expiry')}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: '10px', sm: '12px', md: '16px' },
                padding: { xs: '4px', sm: '8px', md: '16px' },
                fontWeight: '600',
                textAlign: 'end',
              }}
            >
              {t('cards.table.head.action')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            cards.map((item) => (
              <TableRow
                key={item.id}
                data-test-id="card-item"
              >
                <TableCell
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '16px' },
                    padding: { xs: '4px', sm: '8px', md: '16px' },
                    fontWeight: '600'
                  }}
                >
                  {item.number}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '16px' },
                    padding: { xs: '4px', sm: '8px', md: '16px' },
                    fontWeight: '600',
                    maxWidth: '25%',
                    width: '25%',
                    wordBreak: 'break-all',
                  }}
                >
                  {item.owner}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: '10px', sm: '12px', md: '16px' },
                    padding: { xs: '4px', sm: '8px', md: '16px' },
                    fontWeight: '600'
                  }}
                >
                  {item.expiry}
                </TableCell>
                <TableCell
                  sx={{
                    padding: { xs: '4px', sm: '8px', md: '16px' },
                    textAlign: 'end',
                  }}
                >
                  <StyledButton
                    variant="contained"
                    data-test-id="block-card-button"
                    onClick={() => item.id && onBlockCard({ id: item.id })}
                    sx={{ padding: { xs: '2px 8px', sm: '4px 16px' }, fontSize: { xs: '10px', sm: '12px', md: '16px' } }}
                  >
                    {item.blocked ? t('cards.table.body.button.unblock') : t('cards.table.body.button.block')}
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default CardsList;
