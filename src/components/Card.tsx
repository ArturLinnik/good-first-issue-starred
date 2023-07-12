import { useState, useEffect } from "react";

function Card(props: any) {
  const [issuesData, setIssuesData] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issuesResponse = await fetch(
          `${props.repo.url}/issues?labels=good+first+issue`
        );

        const issuesJsonData = await issuesResponse.json();
        setIssuesData(issuesJsonData);
        console.log(issuesJsonData);
      } catch (error) {
        console.error("Error Card.tsx:", error);
      }
    };

    fetchIssues();
  }, [props.repo.url]);

  for (let i = 0; i < issuesData.length; i++) {
    if (issuesData[i]) {
      return (
        <article>
          <header>
            <h2>
              <a href={props.repo.html_url}>{props.repo.full_name}</a>
            </h2>
            <p>{props.repo.description}</p>
          </header>
          <ul>
            {issuesData.map((issue) => (
              <li key={issue.id}>
                {issue.title} - <a href={issue.html_url}>{issue.html_url}</a>
              </li>
            ))}
          </ul>
        </article>
      );
    }
  }

  return <></>;
}

export default Card;
