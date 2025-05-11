package lms;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JWTManager {

    public final String SEC_KEY = "ABCDEFGHIJKLMNOPQRSTUV1234567890WXYZ";
    public final SecretKey key = Keys.hmacShaKeyFor(SEC_KEY.getBytes());

    public String generateToken(String email) {
        Map<String, String> data = new HashMap<>();
        data.put("email", email);

        return Jwts.builder()
                .setClaims(data)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86_556_654L)) // ~1 day
                .signWith(key)
                .compact();
    }

    public String validateToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            return "401"; // Token is missing
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Date expiry = claims.getExpiration();
            if (expiry == null || expiry.before(new Date())) {
                return "401"; // Token expired
            }

            return claims.get("email", String.class); // Valid token
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            return "401"; // Invalid token
        }
    }
}
