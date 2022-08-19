import type { TimeStamp } from '@/models';

import type { FileInfo } from '@/lib/file-manager/type';

import type { NoticeType } from '@/services/info/notice/config';

export interface NoticePostModel {
    board_id: string;
    post_id: string,
    category?: string;
    title: string;
    contents: string;
    files: FileInfo[];
    options: {
        is_popup: boolean;
        is_pinned: boolean;
    },
    view_count: 0,
    writer: string;
    scope: NoticeType;
    // `domain_id` should & would not exist when the post is as SYSTEM
    domain_id?: string;
    user_id: string;
    user_domain_id: string;
    created_at: TimeStamp;
    updated_at: TimeStamp;
}