package cc.iternaryrate.iternaryrate.post;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
public class PostController {


    @Autowired
private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getPosts(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String rating,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date
            ){
        return postService.getPosts();
    }


    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody Post post) {
         postService.createPost(post);
         return ResponseEntity.ok("Post has successfully been created");
    }

    @PutMapping
    public ResponseEntity<Post> updatePost(@RequestBody Post post){
        Post updatedPost = postService.updatePost(post);
        if (updatedPost != null){
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(updatedPost, HttpStatus.NOT_FOUND);
        }
    }


}
