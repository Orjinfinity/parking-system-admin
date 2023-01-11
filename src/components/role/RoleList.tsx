import { useRef } from 'react';
import styled from 'styled-components';
import { Role, Skelaton, View } from '..';
import { END_POINTS } from '../../consts';
import { useFetch } from '../../hooks/useFetch';
import { IRoleCard } from '../../interfaces';

const CardContainer = styled(View)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;

  @media screen and (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px;
  }
`;

const RoleList = () => {
  const dataFetchRef = useRef<boolean>(true);
  const { data, loading, error } = useFetch(
    END_POINTS.ROLES.roles,
    { page: 0, size: 10 },
    dataFetchRef,
    []
  );
  
  if(loading) return <Skelaton/>

  if(error) return <View>{error}</View>

  return <CardContainer>
  {data.resultData.map((role: IRoleCard) => (
    <Role key={role.id} role={role} />
  ))}
</CardContainer>
};

export default RoleList;
