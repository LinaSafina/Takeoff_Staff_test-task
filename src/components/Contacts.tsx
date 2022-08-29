import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const Contacts = () => {
  const { userId } = useParams();
  const url = `/contacts`;

  useEffect(() => {
    getUserContacts()
      .then((data) => console.log(data))
      .catch((e) => console.log(e.message));

    async function getUserContacts() {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    }
  }, []);

  return <ul>List of users</ul>;
};
