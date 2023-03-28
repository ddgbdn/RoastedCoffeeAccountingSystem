import React from 'react'
import '../../pages/pages.css';

const TablePaginationFooter = ({cols}: IFooterProps) => {
    return (
        <td colSpan={cols} className='pagination'>
            <span className='pageInfo'>
                1-5 of 10
            </span>
            <button>
                <i className='bi bi-chevron-bar-left' />
            </button>
            <button>
                <i className='bi bi-chevron-left' />
            </button>
            <button>
                <i className='bi bi-chevron-right' />
            </button>
            <button>
                <i className='bi bi-chevron-bar-right' />
            </button>
        </td>
    )
}

interface IFooterProps {
    cols: number
}

export default TablePaginationFooter