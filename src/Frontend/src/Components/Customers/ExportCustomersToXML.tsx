import ExportButton from '../UI/Buttons/ExportButton'; // Assicurati di importare correttamente il tuo componente
import xmlbuilder from 'xmlbuilder';

function ExportCustomersToXML({ data }) {
  const handleExportClick = () => {
    
    // Crea la stringa XML
    const xml = xmlbuilder.create('data');
    
    data.forEach((row, index) => {
      const item = xml.ele('item', { id: row.id });
      item.ele('name', row.name);
      item.ele('address', row.address);
      item.ele('email', row.email);
      item.ele('phone', row.phone);
      item.ele('iban', row.iban);
      item.ele('code', row.customerCategory.code);
      item.ele('description', row.customerCategory.description);
    });
    
    const xmlString = xml.end({ pretty: true });

    // Crea un oggetto blob e avvia il download
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // <button onClick={handleExportClick}>Esporta in XML</button>
    <ExportButton onClick={handleExportClick}>Esporta in XML</ExportButton>
  );
}

export default ExportCustomersToXML;