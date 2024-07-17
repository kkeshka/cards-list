import { styled, Tab, Tabs } from "@mui/material";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const TabsWrapper = styled(Tabs)`
  & .MuiTabs-indicator {
    background-color: #000;
  }
`

const TabItemWrapper = styled(Tab)`
  &.Mui-selected {
    color: #000;
  }
`

function LanguageSwitch({
  value,
  onChange,
}: IProps) {


  return (
    <TabsWrapper
      centered
      value={value}
      onChange={(_event: React.SyntheticEvent, newValue: string) => onChange(newValue)}
    >
      <TabItemWrapper label={'English'} value={'en'}/>
      <TabItemWrapper label={'Русский'} value={'ru'}/>
    </TabsWrapper>
  )
}

export default LanguageSwitch;