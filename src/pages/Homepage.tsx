import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  margin: '20px 0',
  backgroundColor: '#fff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const Homepage = () => {
  return (
    <Box>
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="https://your-logo-url.com" alt="Pethub" height="30" />
          </Typography>
          <Button color="inherit">Stays</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Login services</Button>
          <Avatar sx={{ ml: 2 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* Search Section */}
        <SearchBar>
          <TextField
            label="Where"
            variant="outlined"
            placeholder="Select destination"
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Check in"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Checkout"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Pets"
            variant="outlined"
            placeholder="Add pets"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </SearchBar>

        {/* Hero Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Pet's perfect getaway
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Plan and book your furry friend's stay with complete peace of mind!
            With our range of convenient locations and a team ready to assist, making a reservation has never been easier.
          </Typography>
        </Box>

        {/* Cities Section */}
        <Grid container spacing={3} sx={{ my: 4 }}>
          {[
            { 
              city: 'Lisboa', 
              days: '42 stays', 
              img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop'
            },
            { 
              city: 'Porto', 
              days: '29 stays', 
              img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop'
            },
            { 
              city: 'Aveiro', 
              days: '14 stays', 
              img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop'
            },
            { 
              city: 'Braga', 
              days: '18 stays', 
              img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop'
            },
          ].map((location) => (
            <Grid item xs={12} sm={3} key={location.city}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={location.img}
                  alt={location.city}
                />
                <CardContent>
                  <Typography variant="h6">{location.city}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.days}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Popular Stays Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h5" gutterBottom>
            Popular stays
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Explore our pets' favorites
          </Typography>
          <Grid container spacing={3}>
            {[
              { 
                name: 'Furry Retreat', 
                rating: '4.7', 
                img: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&auto=format&fit=crop'
              },
              { 
                name: 'Paws & Play Lodge', 
                rating: '4.9', 
                img: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&auto=format&fit=crop'
              },
              { 
                name: 'The Snuggle Spot', 
                rating: '4.5', 
                img: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&auto=format&fit=crop'
              },
              { 
                name: 'Wagging Tails Haven', 
                rating: '4.8', 
                img: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&auto=format&fit=crop'
              },
            ].map((stay) => (
              <Grid item xs={12} sm={3} key={stay.name}>
                <StyledCard>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={stay.img}
                      alt={stay.name}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }}
                      size="small"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StarIcon sx={{ color: 'gold', mr: 1 }} />
                      <Typography variant="body2">{stay.rating}</Typography>
                    </Box>
                    <Typography variant="h6">{stay.name}</Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Care Tips Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h5" gutterBottom>
            Take care of your furry friend
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Have you already registered your puppy?',
                img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&auto=format&fit=crop'
              },
              {
                title: 'Have you found a furry friend on the street and dont know what to do?',
                img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&auto=format&fit=crop'
              },
              {
                title: 'Did you know about street cat fostering?',
                img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&auto=format&fit=crop'
              }
            ].map((tip, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={tip.img}
                    alt={tip.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Finding an animal on the street can be a challenging. Here are some tips and steps...
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;