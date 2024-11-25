import { Box, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <TwitterIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <YouTubeIcon fontSize="large" color="error" />
            </Grid>
            <Grid item>
              <InstagramIcon fontSize="large" color="secondary" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Azualtiv
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to my official website! I'm Azualtiv, a content creator and VTuber.
          [Add biography here]
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Latest Streams
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <iframe
              src="https://player.twitch.tv/?channel=azualtiv&parent=localhost"
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              height="100%"
              width="100%"
              title="Twitch Stream"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            TikTok Highlights
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            {/* Replace with actual TikTok embed code */}
            <Typography>TikTok Embed Placeholder</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;