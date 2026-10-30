import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocuments } from "../services/api";
import DocCard from "../components/DocCard";
import { formatCategory } from "../../../shared/utils/categories";
import { SkeletonGrid } from "../../../shared/components/SkeletonLoader";

const LIMIT = 24;

export default function CategoryPage({ selectedLanguage }) {
  const paramsUrl = useParams();
  const category = paramsUrl["*"];
  const [docs, setDocs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const params = {
      ...(selectedLanguage ? { language: selectedLanguage } : {}),
      category,
      page,
      limit: LIMIT,
      ungrouped: true,
    };
    getDocuments(params)
      .then((r) => {
        setDocs(r.data.documents);
        setTotal(r.data.total);
      })
      .catch((err) => console.error("CategoryPage error:", err))
      .finally(() => setLoading(false));
  }, [category, page, selectedLanguage]);

  // Reset page to 1 when category or language changes
  useEffect(() => {
    setPage(1);
  }, [category, selectedLanguage]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <nav className="breadcrumb">
        <Link to="/">home</Link>
        <span className="sep">/</span>
        <span className="active-path">{formatCategory(category)}</span>
      </nav>

      <div className="page-header-block">
        <h1 className="page-title page-title-hero">
          {formatCategory(category)}
        </h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          {total > 0 ? `${total} technical archives in this domain` : "\u00A0"}
        </p>
      </div>

      <hr className="divider" />

      {loading ? (
        // ── Skeleton grid instead of a bare spinner ──
        <SkeletonGrid count={LIMIT} type="doc" />
      ) : (
        <>
          <div className="grid grid-bento">
            {docs.map((doc) => (
              <DocCard key={doc.path} doc={doc} />
            ))}
          </div>

          {/* Pagination */}
          {total > LIMIT && (
            <div className="search-pagination" style={{ marginTop: "32px" }}>
              {Array.from(
                { length: Math.ceil(total / LIMIT) },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`page-btn-num ${p === page ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
