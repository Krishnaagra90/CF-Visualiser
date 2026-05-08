const rankColors = {
  newbie: "text-gray-500",
  pupil: "text-green-700",
  specialist: "text-cyan-600",
  expert: "text-blue-700",
  "candidate master": "text-fuchsia-700",
  master: "text-orange-500",
  "international master": "text-orange-500",
  grandmaster: "text-red-600",
  "international grandmaster": "text-red-600",
  "legendary grandmaster": "text-red-800",
};

function getRankColor(rank) {
  if (!rank) return rankColors.newbie;
  return rankColors[rank.toLowerCase()] || rankColors.newbie;
}

function ProfileRow({ label, value }) {
  return (
    <div className="grid grid-cols-[130px_1fr] border-t border-gray-200 text-sm">
      <span className="bg-gray-50 px-3 py-2 font-semibold text-gray-600">
        {label}
      </span>
      <span className="px-3 py-2 text-gray-900">{value || "N/A"}</span>
    </div>
  );
}

function ProfileCard({ user }) {
  const rankColor = getRankColor(user.rank);
  const maxRankColor = getRankColor(user.maxRank);

  return (
    <section className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-300 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-800">
        Contestant profile
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[150px_1fr]">
        <img
          src={user.titlePhoto}
          alt={`${user.handle} profile`}
          className="h-32 w-32 rounded border border-gray-300 object-cover sm:h-36 sm:w-36"
        />

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className={`text-2xl font-bold ${rankColor}`}>
              {user.handle}
            </h2>
            <span className={`text-sm font-bold lowercase ${rankColor}`}>
              {user.rank || "unrated"}
            </span>
          </div>

          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Current rating
              </p>
              <p className={`text-lg font-bold ${rankColor}`}>
                {user.rating || "Unrated"}
              </p>
            </div>
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Max rating
              </p>
              <p className={`text-lg font-bold ${maxRankColor}`}>
                {user.maxRating || "N/A"}
              </p>
            </div>
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Max rank
              </p>
              <p className={`text-lg font-bold ${maxRankColor}`}>
                {user.maxRank || "N/A"}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-gray-200">
            <ProfileRow label="Contribution" value={user.contribution} />
            <ProfileRow label="Friend of" value={user.friendOfCount} />
            <ProfileRow label="Organization" value={user.organization} />
            <ProfileRow
              label="Location"
              value={[user.city, user.country].filter(Boolean).join(", ")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
