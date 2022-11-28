interface MongoDBServerTypes {
  binary: {
    version: string;
    skipMD5: boolean;
  };
  autoStart: boolean;
  instance: {
    dbName: string;
  };
}

const mongodbMemoryServerOptions: MongoDBServerTypes = {
  binary: {
    version: "4.0.3",
    skipMD5: true
  },
  autoStart: false,
  instance: {
    dbName: "jest"
  }
};

export default mongodbMemoryServerOptions;
