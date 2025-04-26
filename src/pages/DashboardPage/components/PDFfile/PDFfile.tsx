import { Buffer } from 'buffer';
import React from 'react';
import { Page, Text, Document, StyleSheet, Image, View } from '@react-pdf/renderer';
import { dateFormatter } from '../../../../utils/helpers';
import { IProject } from '../../../../types';
import { capitalise } from '../../../ReportPage/utils';
import Logo from '../../../../assets/logo.png';

interface IProps {
  project:
    | IProject
    | {
        name: string;
      };
  content: string;
  chartBase64String?: string;
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 55,
    position: 'relative'
  },

  mainTitle: {
    fontSize: 48,
    textAlign: 'left',
    marginTop: '50%',
    marginBottom: 20,
    fontWeight: 'bold'
  },

  subTitle: {
    fontSize: 24,
    marginBottom: 20
  },

  sideDecoration: {
    position: 'absolute',
    top: '25%',
    left: 0,
    width: 35,
    height: '60%',
    backgroundColor: '#6a2add',
    transform: 'translate(0, -50%)'
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#6a2add'
  },

  logo: {
    width: '25%'
  }
});

function PDFfile({ project, content, chartBase64String }: IProps) {
  return (
    <Document>
      <Page style={styles.body}>
        <Image src={Logo} style={styles.logo} />
        <View style={styles.sideDecoration} />
        <Text style={styles.mainTitle}>Sprint Report</Text>
        <Text style={{ ...styles.subTitle, fontSize: 20 }}>Project Name: </Text>
        <Text style={styles.subTitle}>{capitalise(project?.name)}</Text>
        <Text style={styles.subTitle}>{dateFormatter()}</Text>
        <Text
          style={{
            color: '#6a2add',
            fontSize: 15,
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >
          Powered by OpenAi
        </Text>
      </Page>

      <Page style={styles.body}>
        {chartBase64String ? (
          <Image
            src={{
              data: Buffer.from(chartBase64String, 'base64'),
              format: 'png'
            }}
          />
        ) : null}
        <View style={{ height: 60 }} />
        {content.split('\n\n').map((item) => (
          <Text
            key={crypto.randomUUID()}
            style={{ marginBottom: 20, fontSize: 20, lineHeight: 1.5 }}
          >
            {item}
          </Text>
        ))}
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages} Page(s)`} />
        <View fixed style={styles.bottomDecoration} />
      </Page>
    </Document>
  );
}

export default PDFfile;

PDFfile.defaultProps = {
  chartBase64String: ''
};
