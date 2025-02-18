import React from 'react';
import CommentsList from 'components/templates/CommentsList/CommentsList';
import CreateCommentForm from 'components/organisms/CreateCommentForm/CreateCommentForm';
import { useGetAllUsersQuery, useGetMeQuery } from '../../../domain/user/userApi';
import { useGetAllCommentsQuery, useGetChangedCommentsQuery } from '../../../domain/comment/commentsApi';
import './index.scss';
import { REFETCH_COMMENTS_INTERVAL } from '../../../utils/consts/appConsts';

const MainPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: allComments } = useGetAllCommentsQuery(undefined, {
    pollingInterval: REFETCH_COMMENTS_INTERVAL,
  });
  const { data: me } = useGetMeQuery();
  const { data: changedComments } = useGetChangedCommentsQuery(undefined, {
    skip: !me?.id,
  });

  return (
    <div className="page_wrapper">
      <div className="page_wrapper__heading">
        <h1>Комментарии к посту</h1>
      </div>
      {me && <CreateCommentForm />}

      <CommentsList comments={allComments ?? []} users={users ?? []} changedComments={changedComments} />
    </div>
  );
};

export default MainPage;
