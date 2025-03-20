import React, { useEffect, useState } from "react";
import { API_URL } from "./config";
import Swal from "sweetalert2";

const Sermons = () => {
  const [sermons, setSermons] = useState([]); // Start with empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch(`${API_URL}/sermons`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSermons(data);
      } catch (error) {
        console.error("Error fetching sermons:", error);
        Swal.fire({
          icon: "error",
          title: "Loading Failed",
          text:
            error.message || "Failed to load sermons. Please try again later.",
        });
        // Fallback to empty array instead of dummy data
        setSermons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter((sermon) =>
    sermon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>Sermons</h4>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search sermons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading sermons...</p>
      ) : filteredSermons.length === 0 ? (
        <p style={styles.noResults}>
          No sermons found{searchQuery && ` for "${searchQuery}"`}
        </p>
      ) : (
        <div style={styles.listContainer}>
          {filteredSermons.map((sermon) => (
            <div key={sermon.id} style={styles.sermonCard}>
              <h5 style={styles.sermonTitle}>{sermon.name}</h5>
              <p style={styles.sermonDate}>
                Date: {new Date(sermon.date).toLocaleDateString()}
              </p>
              <a
                href={sermon.weblink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.youtubeLink}
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    minHeight: "60vh",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    color: "#1a6363",
    marginBottom: "25px",
  },
  searchContainer: {
    textAlign: "center",
    marginBottom: "25px",
    width: "100%",
  },
  searchInput: {
    width: "80%",
    maxWidth: "500px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #1a6363",
    fontSize: "14px",
    width: "344px",
  },
  listContainer: {
    margin: "0 auto",
    maxWidth: "700px",
    width: "100%",
    marginBottom: "115px"
  },
  sermonCard: {
    border: "1px solid #1a6363",
    borderRadius: "10px",
    padding: "20px",
    margin: "15px 0",
    backgroundColor: "#f8fafb",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  },
  sermonTitle: {
    margin: "0",
    fontSize: "18px",
    color: "#1a6363",
    fontWeight: "600",
  },
  sermonDate: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#666",
  },
  youtubeLink: {
    display: "inline-block",
    backgroundColor: "#1a6363",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    marginTop: "12px",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
  loadingText: {
    fontSize: "16px",
    color: "#666",
    textAlign: "center",
  },
  noResults: {
    fontSize: "16px",
    color: "#666",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Sermons;
