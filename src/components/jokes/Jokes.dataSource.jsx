import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import getJokes from "../../api/jokes";

export default function useJokesDataSource(page) {
  const router = useRouter();
  const [state, setState] = useState({
    currentPage: page,
    totalPages: 0,
    hasPrev: false,
    hasNext: false,
  });

  const prevPage = useCallback(function () {
    setState((state) =>
      state.hasPrev ? { ...state, currentPage: state.currentPage - 1 } : state
    );
  }, []);

  const nextPage = useCallback(function () {
    setState((state) =>
      state.hasNext ? { ...state, currentPage: state.currentPage + 1 } : state
    );
  }, []);

  useEffect(() => {
    router.push(`/?page=${state.currentPage}`, undefined, {
      shallow: true,
    });

    getJokes(state.currentPage).then((response) => {
      setState({
        currentPage: state.currentPage,
        totalPages: response.data.total_pages,
        hasPrev: response.data.previous_page !== response.data.current_page,
        hasNext: response.data.next_page !== response.data.current_page,
        jokes: response.data.results,
      });
    });
  }, [state.currentPage]);

  return [state, prevPage, nextPage];
}
