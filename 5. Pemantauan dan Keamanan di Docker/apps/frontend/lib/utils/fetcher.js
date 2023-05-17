import getBaseURL from './storage';
import AuthenticationError from './AuthenticationError';

const fetcher = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.status.toString().startsWith('2')) {
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${getBaseURL()}authentications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.status !== 200) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw new AuthenticationError('Mohon login ulang.');
  }

  const { data: { accessToken } } = await response.json();
  localStorage.setItem('accessToken', accessToken);
};

const fetchWithAuthentication = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.status.toString().startsWith('2')) {
    if (response.status === 401) {
      await refreshAccessToken();
      return fetchWithAuthentication(url, options);
    }
    const { message } = await response.json();
    throw new Error(message);
  }

  return response.json();
};

export { fetchWithAuthentication };
export default fetcher;
