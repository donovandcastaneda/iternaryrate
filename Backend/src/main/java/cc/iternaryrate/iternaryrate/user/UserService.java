package cc.iternaryrate.iternaryrate.user;


import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void register(UserDto userDto) {
        logger.info("Attempting to register user: {}", userDto.getUsername());
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty()) {
            logger.error("Email is null or empty");
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (userDto.getUsername() == null || userDto.getUsername().isEmpty()) {
            logger.error("Username is null or empty");
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        if (userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            logger.error("Password is null or empty");
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        try {
            User user = new User();
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            entityManager.persist(user);
            logger.info("User registered successfully: {}", user.getUsername());
        } catch (Exception e) {
            logger.error("Error persisting user", e);
            throw e;
        }
    }

    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (!user.getUsername().equals(username)) {
            throw new UsernameNotFoundException("User does not exist in database");
        }
        if (!user.getPassword().equals(passwordEncoder.encode(user.getPassword()))) {
            throw new BadCredentialsException("password is not correct");
        }
        return true;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if (u == null) {

            throw new UsernameNotFoundException("this user does not exist in the repository");
        }
        return new AuthenticatedUser(u);
    }
}