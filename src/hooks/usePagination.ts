import { useState, useCallback } from 'react';

export interface PaginationState {
  page: number;
  rowsPerPage: number;
}

export const usePagination = (initialPage = 0, initialRowsPerPage = 25) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    rowsPerPage: initialRowsPerPage
  });

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPagination({ page: 0, rowsPerPage: newRowsPerPage });
  }, []);

  const resetPagination = useCallback(() => {
    setPagination({ page: initialPage, rowsPerPage: initialRowsPerPage });
  }, [initialPage, initialRowsPerPage]);

  return {
    ...pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    resetPagination
  };
};