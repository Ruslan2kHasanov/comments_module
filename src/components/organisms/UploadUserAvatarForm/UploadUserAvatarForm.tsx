import React, { useEffect, useState } from 'react';
import type { GetProp, UploadProps } from 'antd';
import { Flex, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetMeQuery } from '../../../domain/user/userApi';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UploadUserAvatarForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useGetMeQuery();
  const [imageUrl, setImageUrl] = useState<string>(me?.avatar);

  useEffect(() => {
    if (me?.avatar) {
      setImageUrl(me.avatar);
    }
  }, [me?.avatar]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      Аватар:
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%', objectFit: 'cover', height: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default UploadUserAvatarForm;
