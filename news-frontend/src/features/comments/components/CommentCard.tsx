import React from 'react';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {Box, Button, CardActions, Typography} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Comments} from "../../../types";

interface Props {
  comment: Comments;
  onRemove: (commentId: string, news_id: string) => void;
  loading: string | false;
}

const CommentCard: React.FC<Props> = ({comment, onRemove, loading}) => {
  return (
    <div>
      <Card sx={{minWidth: '600px', mb: 3}}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
              Author: {comment.author === null ? 'Anonymous' : comment.author}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {comment.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              sx={{color: 'red'}}
              disabled={loading ? loading === comment.id.toString() : false}
              onClick={() => onRemove(comment.id.toString(), comment.news_id.toString())}
            >
              Delete
              <DeleteOutlineOutlinedIcon sx={{ml: 2}}/>
            </Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
};

export default CommentCard;