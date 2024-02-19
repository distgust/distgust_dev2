import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Loader from "./Loader";
import { useEffect,useState } from 'react'
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 5,
  },
});

const CompetitionReportPDF = ({ report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
            {report.map((value, key) => {
                let RewardCount = 0;
                let TypeKey = key
                let competitionType = Object.keys(value)
                let RewardReport = value[competitionType]
                return (
                    <View key={key} style={styles.section}>
                        <Text style={styles.heading}>{competitionType}</Text>
                        <View>
                            {RewardReport.map((rewarddata) => {
                                let Number = rewarddata.registerNumber
                                RewardCount++
                                return(
                                    <Text key={TypeKey+RewardCount} style={styles.listItem}>
                                        {`PLACE ${RewardCount} : ${rewarddata.registerName} NUMBER ${Number}`}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                )
            })}
    </Page>
  </Document>
);

const CompetitionReport = (props) => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = props.apiserver;
  const cid = props.competitionid;

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await fetch(`${server}/api/competitionreport/${cid}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'any',
          },
        });
        const result = await response.json();
        setReport(result.report);
      } catch (err) {
        console.error(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    getReport();
  }, [server, cid]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <CompetitionReportPDF report={report} />
      </PDFViewer>
    );
  }
};

export default CompetitionReport;