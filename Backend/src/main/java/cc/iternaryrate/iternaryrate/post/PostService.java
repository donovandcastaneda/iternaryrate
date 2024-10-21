package cc.iternaryrate.iternaryrate.post;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    public Post createPost(Post post){
        return postRepository.save(post);
    }

    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Optional<Post> findPostById(Long id){
        return postRepository.findById(id);
    }

public Post updatePost(Post updatedPost){
Optional<Post> existingPost = postRepository.findById(updatedPost.getId());
if(existingPost.isPresent()){
    Post postToUpdate = existingPost.get();
    postToUpdate.setTitle(updatedPost.getTitle());
    postToUpdate.setDescription(updatedPost.getDescription());
    postToUpdate.setRating(updatedPost.getRating());
    postToUpdate.setLocation(updatedPost.getLocation());
    postToUpdate.setStart_date(updatedPost.getStart_date());
    postToUpdate.setEnd_date(updatedPost.getEnd_date());
return postToUpdate;
}
return null;
}
@Transactional
    public void deletePost(Long id){
        postRepository.deleteById(id);
    }




}



