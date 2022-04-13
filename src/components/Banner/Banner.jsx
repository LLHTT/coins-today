import { makeStyles, Container, Typography } from '@material-ui/core'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner.jpg)",
        objectFit: "cover"
    },
    bannerContent: {
        height: 500,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}))

const Banner = () => {
    const classes = useStyles()

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: "Inter"
                        }}
                    >
                        Coins Today
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "uppercase",
                            fontFamily: "Inter"
                        }}
                    >
                        Get all the info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner