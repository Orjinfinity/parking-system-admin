
import styled from 'styled-components';
import { IRoleCard } from '../../interfaces';
import imagePath from '../../utils/assetHelper';
import { errorMessage, successMessage } from '../../services';
import { Title, View, Image, Button, Text, CopyIcon } from '..';

const ContentStyled = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const RoleCountStyled = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  background-color: #eeeeee;
`;

const ImageContainer = styled(View)`
  position: relative;
  display: flex;
  align-items: center;
  img {
    position: absolute;
    &:nth-child(1) {
      right: 90px;
      z-index: 4;
    }
    &:nth-child(2) {
      right: 60px;
      z-index: 3;
    }
    &:nth-child(3) {
      right: 30px;
      z-index: 2;
    }
  }
`;

interface IRole {
  role: IRoleCard;
}

const Role = ({ role }: IRole) => {
  const isRoleCard = Boolean(role);

  const copyToClipboard = async (role: string) => {
    try {
      await navigator.clipboard.writeText(role).then(() => {
        successMessage(`${role} başarıyla kopyalandı.`, { autoClose: 2000 });
      });
    } catch {
      errorMessage('Kopyalama başarısız.', { autoClose: 2000 });
    }
  };

  return (
    <ContentStyled>
      {isRoleCard ? (
        <>
          <View
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="24px"
          >
            <Text fontSize="small" color="textSecondaryColor">
              Total {role.users?.length || 0} users
            </Text>
            <ImageContainer height="40px">
              <Image src={imagePath('Avatar3.png')} alt="avatar_1" />
              <Image src={imagePath('Avatar2.png')} alt="avatar_2" />
              <Image src={imagePath('AvatarGirl.png')} alt="avatar_3" />
              <RoleCountStyled>+ 3</RoleCountStyled>
            </ImageContainer>
          </View>
          <Title
            fontSize="20px"
            fontWeight="500"
            color="textSecondaryColor"
            mb="8px"
          >
            {role.name.toUpperCase()}
          </Title>
          <View
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              fontSize="small"
              fontWeight="400"
              lineHeight="20px"
              variant="text"
              color="primary"
              size="auto"
            >
              Edit Role
            </Button>
            <Button
              variant="icon"
              size="auto"
              onClick={() => copyToClipboard(role.name.toUpperCase())}
            >
              <CopyIcon size="20px" color="textColor" />
            </Button>
          </View>
        </>
      ) : (
        <View display="flex" justifyContent="space-between">
          <Image src={imagePath('illustration.png')} />
          <View display="flex" flexDirection="column" alignItems="flex-end">
            <Button
              fontSize="medium"
              padding="10px 20px"
              width="112px"
              letterSpacing=".46px"
              type="submit"
              variant="contained"
              color="primary"
              size="md"
            >
              Yeni Role
            </Button>
            <Text
              maxWidth="200px"
              mt="16px"
              textAlign="right"
              color="textSecondaryColor"
            >
              Add new role, if it doesn't exist.
            </Text>
          </View>
        </View>
      )}
    </ContentStyled>
  );
};

export default Role;
