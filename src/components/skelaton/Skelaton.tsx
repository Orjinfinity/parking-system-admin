import styled from 'styled-components';
import { View } from '..';

const SkelatonStyled = styled(View)`
    display: inline-block;
    height: 40px;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    width: 100%;
    background-image: -webkit-linear-gradient(left, #ffffff 0px, #f4f4f4 40px, #ffffff 80px);
    background-image: -o-linear-gradient(left, #ffffff 0px, #f4f4f4 40px, #ffffff 80px);
    background-image: linear-gradient(90deg, #ffffff 0px, #f4f4f4 40px, #ffffff 80px);
    background-size: 250px;
    -webkit-animation: shine-loading-image 2s infinite ease-out;
    animation: shine-loading-image 2s infinite ease-out;
`;

const Skelaton = () => {
  return (
    <View display="flex" className="skelaton o-media">
      <div className="o-media__figure">
        <span className="skeleton-box"></span>
      </div>
      <View flexGrow="1" className="o-media__body">
        <div className="o-vertical-spacing">
          <h3 style={{ fontSize: '1.25em' }} className="blog-post__headline">
            <span className="skeleton-box"></span>
          </h3>
          <div>
            <SkelatonStyled className="skeleton-box"></SkelatonStyled>
            <SkelatonStyled className="skeleton-box"></SkelatonStyled>
            <SkelatonStyled className="skeleton-box"></SkelatonStyled>
            <SkelatonStyled className="skeleton-box"></SkelatonStyled>
          </div>
          <div className="blog-post__meta">
            <SkelatonStyled className="skeleton-box"></SkelatonStyled>
          </div>
        </div>
      </View>
    </View>
  );
};

export default Skelaton;
