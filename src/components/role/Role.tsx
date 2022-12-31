import View from '../view/View';
import Text from '../text/Text';
import Image from '../image/Image';
import styled from 'styled-components';
import Title from '../title/Title';
import Button from '../button/Button';
import CopyIcon from '../icons/CopyIcon';
import { IRoleCard } from '../../interfaces';
import imagePath from '../../utils/assetHelper';
import { errorMessage, successMessage } from '../../services';

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

const Role = ({ role = '', count = null }: IRoleCard) => {
  const isRoleCard = Boolean(role && count);

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
              Total {count} users
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
            {role}
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
              onClick={() => copyToClipboard(role)}
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
