function ProfileCard({ user }) {
  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
      <h2>{user.handle}</h2>
      <p>Rating: {user.rating || "Unrated"}</p>
      <p>Max Rating: {user.maxRating || "N/A"}</p>
      <p>Rank: {user.rank || "N/A"}</p>
      <p>Max Rank: {user.maxRank || "N/A"}</p>
    </div>
  );
}

export default ProfileCard;