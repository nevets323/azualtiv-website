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
  Link
} from '@mui/material';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';
import { useAuth } from '../utils/AuthContext';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    creationDate: '',
    commissionerLink: '',
    imageFile: null
  });
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'portfolio'));
    const projectsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProjects(projectsList);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.imageFile) return;

    const storageRef = ref(storage, `portfolio/${newProject.imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, newProject.imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'portfolio'), {
      ...newProject,
      imageUrl,
      createdAt: new Date().toISOString()
    });

    handleClose();
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'portfolio', id));
    fetchProjects();
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
          Add New Project
        </Button>
      )}

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={project.imageUrl}
                alt={project.title}
              />
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
                <Typography variant="body2">
                  Created: {new Date(project.creationDate).toLocaleDateString()}
                </Typography>
                <Link 
                  href={project.commissionerLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Commissioner's Link
                </Link>
                {isAdmin && (
                  <Button 
                    color="error" 
                    onClick={() => handleDelete(project.id)}
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
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <TextField
            margin="dense"
            type="date"
            label="Creation Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newProject.creationDate}
            onChange={(e) => setNewProject({ ...newProject, creationDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Commissioner's Link"
            fullWidth
            value={newProject.commissionerLink}
            onChange={(e) => setNewProject({ ...newProject, commissionerLink: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProject({ ...newProject, imageFile: e.target.files[0] })}
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

export default Portfolio;