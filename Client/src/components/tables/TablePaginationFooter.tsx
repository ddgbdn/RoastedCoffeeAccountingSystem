import React, { Dispatch, SetStateAction } from 'react'
import '../../pages/pages.css';

const TablePaginationFooter = ({
        cols, 
        paginationInfo,
        setPageNumber
    }: IFooterProps) => {          
        
    return (
        <td colSpan={cols} className='pagination'>
            <span className='pageInfo'>
                {setupPageInfo(paginationInfo)}
            </span>
            <button onClick={() => {
                setPageNumber(1)
            }}
            disabled={paginationInfo.CurrentPage === 1}>
                <i className={
                    `bi bi-chevron-bar-left 
                    ${paginationInfo.CurrentPage !== 1 
                    ? '' 
                    : 'disabled'
                    }`
                } />
            </button>
            <button onClick={() => {
                setPageNumber(page => page - 1)
            }}
            disabled={!paginationInfo.HasPrevious}>
                <i className={
                    `bi bi-chevron-left 
                    ${paginationInfo.HasPrevious 
                    ? '' 
                    : 'disabled'
                    }`
                } />
            </button>
            <button onClick={() => {
                setPageNumber(page => page + 1)
            }}
            disabled={!paginationInfo.HasNext}>
                <i className={
                    `bi bi-chevron-right 
                    ${
                        paginationInfo.HasNext 
                        ? '' 
                        : 'disabled'
                    }`
                } />
            </button>
            <button onClick={() => {
                setPageNumber(paginationInfo.PageCount)
            }}
            disabled={paginationInfo.CurrentPage === paginationInfo.PageCount}>
                <i className={
                    `bi bi-chevron-bar-right 
                    ${
                        paginationInfo.CurrentPage !== paginationInfo.PageCount 
                        ? '' 
                        : 'disabled'
                    }`
                } />
            </button>
        </td>
    )
}

const setupPageInfo = (paginationInfo: IPaginationInfo) => {
    const result = `${(paginationInfo.CurrentPage - 1) * paginationInfo.PageSize + 1} - 
    ${paginationInfo.CurrentPage * paginationInfo.PageSize > paginationInfo.TotalCount
    ? paginationInfo.TotalCount
    : paginationInfo.CurrentPage * paginationInfo.PageSize} of  
    ${paginationInfo.TotalCount}`;
    return result;
}

interface IFooterProps {
    cols: number
    paginationInfo: IPaginationInfo
    setPageNumber: Dispatch<SetStateAction<number>>
}

export const defaultPagination: IPaginationInfo = {
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 10,
    TotalCount: 0,
    HasNext: false,
    HasPrevious: false
}

export interface IPaginationInfo {
    CurrentPage: number,
    PageCount: number,
    PageSize: number,
    TotalCount: number,
    HasNext: boolean,
    HasPrevious: boolean
}

export default TablePaginationFooter