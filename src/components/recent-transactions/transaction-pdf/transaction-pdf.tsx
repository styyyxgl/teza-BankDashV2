import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Transaction } from "~/types/transaction.type";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  amountIncome: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "right",
    color: "#16DBCC",
  },
  amountExpense: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "right",
    color: "#fe5c73ff",
  },
});

type Props = {
  transaction: Transaction;
  isIncome: boolean;
};

export const TransactionReceiptPDF: React.FC<Props> = ({
  transaction,
  isIncome,
}) => {
  const amountPrefix = isIncome ? "+" : "-";
  const amountStyle = isIncome ? styles.amountIncome : styles.amountExpense;

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.header}>Transaction Receipt</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(transaction.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Transaction Type:</Text>
          <Text style={styles.value}>{transaction.category}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{transaction.description}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>From Card:</Text>
          <Text style={styles.value}>{transaction.fromCardId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>To Card:</Text>
          <Text style={styles.value}>{transaction.toCardId}</Text>
        </View>

        <Text style={amountStyle}>
          {amountPrefix}${transaction.amount.toFixed(2)}
        </Text>
      </Page>
    </Document>
  );
};
