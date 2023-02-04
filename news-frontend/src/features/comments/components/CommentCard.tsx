import React from 'react';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Box, Button, CardActions, Typography} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Comments} from "../../../types";

interface Props {
  comment: Comments;
  onRemove: (commentId: string, news_id: string) => void;
}
const CommentCard: React.FC<Props> = ({comment, onRemove}) => {
  return (
    <div>
      <Card sx={{ minWidth: '600px', mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {comment.author === null ?'Anonymous' : comment.author}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {comment.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              sx={{color: 'red'}}
              onClick={() => onRemove(comment.id.toString(), comment.news_id.toString())}
            >
              Delete
              <DeleteOutlineOutlinedIcon sx={{ml:2}}/>
            </Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
};

export default CommentCard;