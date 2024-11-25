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
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';
import { useAuth } from '../utils/AuthContext';

function Models() {
  const [models, setModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [newModel, setNewModel] = useState({
    title: '',
    description: '',
    type: '2D',
    artist: '',
    creationDate: '',
    imageFile: null
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const querySnapshot = await getDocs(collection(db, 'models'));
    const modelsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setModels(modelsList);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newModel.imageFile) return;

    const storageRef = ref(storage, `models/${newModel.imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, newModel.imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'models'), {
      ...newModel,
      imageUrl,
      createdAt: new Date().toISOString()
    });

    handleClose();
    fetchModels();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'models', id));
    fetchModels();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {isAdmin && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Add New Model
        </Button>
      )}

      <Grid container spacing={4}>
        {models.map((model) => (
          <Grid item key={model.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={model.imageUrl}
                alt={model.title}
              />
              <CardContent>
                <Typography variant="h6">{model.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {model.description}
                </Typography>
                <Typography variant="body2">
                  Artist: {model.artist}
                </Typography>
                <Typography variant="body2">
                  Type: {model.type}
                </Typography>
                {isAdmin && (
                  <Button 
                    color="error" 
                    onClick={() => handleDelete(model.id)}
                  >
                    Delete
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Model</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newModel.title}
            onChange={(e) => setNewModel({ ...newModel, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newModel.description}
            onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={newModel.type}
              onChange={(e) => setNewModel({ ...newModel, type: e.target.value })}
            >
              <MenuItem value="2D">2D</MenuItem>
              <MenuItem value="3D">3D</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Artist"
            fullWidth
            value={newModel.artist}
            onChange={(e) => setNewModel({ ...newModel, artist: e.target.value })}
          />
          <TextField
            margin="dense"
            type="date"
            label="Creation Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newModel.creationDate}
            onChange={(e) => setNewModel({ ...newModel, creationDate: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewModel({ ...newModel, imageFile: e.target.files[0] })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Models;