import React, { FunctionComponent } from 'react';
import { Alert, Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { DeviceOptionsFormData } from '../DeviceOptionsForm';
import { UserDefineKey, UserDefinesMode } from '../../gql/generated/types';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    marginBottom: 2,
  },
};

interface UserDefinesAdvisorProps {
  deviceOptionsFormData: DeviceOptionsFormData;
}

const UserDefinesAdvisor: FunctionComponent<UserDefinesAdvisorProps> = ({
  deviceOptionsFormData,
}) => {
  const messages: string[] = [];
  if (deviceOptionsFormData.userDefinesMode === UserDefinesMode.UserInterface) {
    const isUserDefine = (
      key: UserDefineKey,
      enabledValue: boolean
    ): boolean => {
      const value = deviceOptionsFormData.userDefineOptions.find(
        (item) => item.key === key
      );
      if (value === undefined) {
        return false;
      }
      return value?.enabled === enabledValue;
    };

    if (isUserDefine(UserDefineKey.UART_INVERTED, false)) {
      messages.push(
        'Disabling UART_INVERTED is uncommon. Please make sure that your transmitter supports that.'
      );
    }
  }
  return messages.length > 0 ? (
    <Box sx={styles.container}>
      {messages.map((message, idx) => (
        <Alert key={idx} severity="warning">
          {message}
        </Alert>
      ))}
    </Box>
  ) : null;
};

export default UserDefinesAdvisor;
