interface FormData {
  message: string;
  name?: string;
  surname?: string;
  quantity?: number;
  messenger?: string;
  phone?: string;
  email?: string;
}

interface QueryParams {
  [key: string]: string | null | undefined;
  refId?: string | null | undefined;
  sub1?: string | null | undefined;
  sub2?: string | null | undefined;
  sub3?: string | null | undefined;
  sub4?: string | null | undefined;
  sub5?: string | null | undefined;
  sub6?: string | null | undefined;
  sub7?: string | null | undefined;
  sub8?: string | null | undefined;
  fbp?: string | null | undefined;
  ttp?: string | null | undefined;
}

const getDefaultUrl = (): string =>
  typeof window !== 'undefined'
    ? document.referrer || 'Не вказано'
    : 'Не вказано';
const url = getDefaultUrl();

function getParamString(queryParams: QueryParams): string {
  let message = '';

  for (const key in queryParams) {
    if (queryParams[key]) {
      message += `${key} <b>${queryParams[key]}</b>\n`;
    }
  }

  return message;
}

const getQueryParams = (): QueryParams => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    refId: searchParams.get('ref_id'),
    sub1: searchParams.get('sub1'),
    sub2: searchParams.get('sub2'),
    sub3: searchParams.get('sub3'),
    sub4: searchParams.get('sub4'),
    sub5: searchParams.get('sub5'),
    sub6: searchParams.get('sub6'),
    sub7: searchParams.get('sub7'),
    sub8: searchParams.get('sub8'),
    fbp: searchParams.get('fbp'),
    ttp: searchParams.get('ttp'),
  };
};

export const sendToGoogleScript = async (data: FormData) => {
  const requestData = {
    ...data,
    url,
    ...getQueryParams(),
  };

  try {
    const response = await fetch('/api/sendToGoogle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data to API: ${errorText}`);
    }
  } catch (error) {
    console.error('Error sending data to API: ', error);
    throw new Error('Error sending data to API: ' + error);
  }
};

export const sendMessage = async (sendData: FormData): Promise<void> => {
  let botMessage;

  botMessage = '<b>Користувач зробив замовлення FlexiFun geometry:</b>\n';
  botMessage += 'Імя: <b>' + sendData.name + '</b>\n';
  botMessage += 'Прізвище: <b>' + sendData.surname + '</b>\n';
  botMessage += 'Кількість: <b>' + sendData.quantity + '</b>\n';
  botMessage += 'Месенджер: <b>' + sendData.messenger + '</b>\n';
  botMessage += 'Телефон: <b>' + sendData.phone + '</b>\n';
  botMessage += 'Емейл: <b>' + sendData.email + '</b>\n';

  botMessage += 'Url: <b>' + url + '</b>\n';

  const params = getQueryParams();
  botMessage += getParamString(params);

  try {
    const response = await fetch('/api/sendToTg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(botMessage),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data to API: ${errorText}`);
    }
  } catch (error) {
    console.error('Error sending data to API: ', error);
    throw new Error('Error sending data to API: ' + error);
  }
};
