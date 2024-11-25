import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';

function FanArt() {
  const [fanArts, setFanArts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFanArt, setNewFanArt] = useState({
    title: '',
    description: '',
    artist: '',
    creationDate: '',
    imageFile: null
  });

  useEffect(() => {
    fetchFanArts();
  }, []);

  const fetchFanArts = async () => {
    const querySnapshot = await getDocs(collection(db, 'fanarts'));
    const artsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setFanArts(artsList);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFanArt.imageFile) return;

    const storageRef = ref(storage, `fanart/${newFanArt.imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, newFanArt.imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'fanarts'), {
      ...newFanArt,
      imageUrl,
      createdAt: new Date().toISOString()
    });

    handleClose();
    fetchFanArts();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Submit Fan Art
      </Button>

      <Grid container spacing={4}>
        {fanArts.map((art) => (
          <Grid item key={art.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={art.imageUrl}
                alt={art.title}
              />
              <CardContent>
                <Typography variant="h6">{art.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {art.description}
                </Typography>
                <Typography variant="body2">
                  Artist: {art.artist}
                </Typography>
                <Typography variant="body2">
                  Created: {new Date(art.creationDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Fan Art</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newFanArt.title}
            onChange={(e) => setNewFanArt({ ...newFanArt, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newFanArt.description}
            onChange={(e) => setNewFanArt({ ...newFanArt, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Artist"
            fullWidth
            value={newFanArt.artist}
            onChange={(e) => setNewFanArt({ ...newFanArt, artist: e.target.value })}
          />
          <TextField
            margin="dense"
            type="date"
            label="Creation Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newFanArt.creationDate}
            onChange={(e) => setNewFanArt({ ...newFanArt, creationDate: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewFanArt({ ...newFanArt, imageFile: e.target.files[0] })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default FanArt;