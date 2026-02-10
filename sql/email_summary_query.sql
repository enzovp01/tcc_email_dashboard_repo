-- email_summary_query.sql
-- Consulta exemplo para consolidação de envios/aberturas/cliques por EmailName (Job)
-- Ajuste filtros (nomes, datas, dias) conforme sua regra de negócio e período do estudo.

SELECT
    j.EmailName,
    COUNT(DISTINCT s.SubscriberID) AS NumberOfSent,
    COUNT(DISTINCT o.SubscriberID) AS NumberOfOpens,
    COUNT(DISTINCT c.SubscriberID) AS NumberOfClicks,
    CONVERT(VARCHAR, s.EventDate, 120) AS SendTime,
    CAST(s.EventDate AS DATE) AS Date
FROM _Sent s
JOIN _Job j ON s.JobID = j.JobID
LEFT JOIN _Open o ON o.JobID = s.JobID AND o.SubscriberID = s.SubscriberID
LEFT JOIN _Click c ON c.JobID = s.JobID AND c.SubscriberID = s.SubscriberID
WHERE (
        j.EmailName LIKE '%CONVITE%'
     OR j.EmailName LIKE '%WARMUP%'
     OR j.EmailName LIKE '%PROMO%'
     OR j.EmailName LIKE '%CPL%'
    )
  AND DATENAME(WEEKDAY, s.EventDate) IN ('Saturday', 'Sunday')
  AND YEAR(s.EventDate) = 2025
GROUP BY
    j.EmailName,
    CONVERT(VARCHAR, s.EventDate, 120),
    CAST(s.EventDate AS DATE);
