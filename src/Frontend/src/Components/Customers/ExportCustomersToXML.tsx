import xmlbuilder from 'xmlbuilder';

function ExportCustomersToXML({ data }) {
  const handleExportClick = () => {
    
    // Crea la stringa XML
    const xml = xmlbuilder.create('data');
    
    data.forEach((row, index) => {
      const item = xml.ele('item', { id: index + 1 });
      item.ele('name', row.name);
      item.ele('age', row.age);

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
    <button onClick={handleExportClick}>Esporta in XML</button>
  );
}

export default ExportCustomersToXML;