import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Invoice } from '../types/invoice';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 24, marginBottom: 20 }
});

const PDFTemplate = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.header}>Invoice #{invoice.id}</Text>
        {/* Add other fields */}
      </View>
    </Page>
  </Document>
);

export default PDFTemplate; 