import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Slider from "react-slick";
import { setcontainer } from "../../app/layout/containerSlice";
import { useAppDispatch, useAppSelector} from "../../app/store/configureStore";

export default function HomePage() {
  const {isFull} = useAppSelector(state=>state.container)
  const dispatch = useAppDispatch();

  useEffect(() => {
    //1.Mount
    dispatch(setcontainer());
    console.log(isFull)
    return () => {
      //2.unMount
      dispatch(setcontainer());
      console.log(isFull)
    };
  }, [dispatch]);

  const number = [1, 2, 3, 4, 5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        {number.map((item) => (
          <div key={item}>
            <img
              src={`https://picsum.photos/200/300/?${Math.random()}`}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        ))}
      </Slider>
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h3">Welcome to the store</Typography>
      </Box>
    </>
  );
}
