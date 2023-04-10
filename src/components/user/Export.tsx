import { Button } from '..';

const Export = ({ onExport }: { onExport: () => void }) => {
  return <Button onClick={() => onExport()}>Export</Button>;
};

export default Export;
